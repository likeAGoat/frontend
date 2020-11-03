<?php
function get($key, $def)
{
    $value = $def;

    if (isset($_GET[$key])) {
        $value = $_GET[$key];

        if (!is_array($value)) {
            $value = trim($value);
            if (mb_strlen($value) < 1) {
                $value = $def;
            }
        }
    }

    return $value;
}


function post($key, $def)
{
    $value = $def;

    if (isset($_POST[$key])) {
        $value = $_POST[$key];

        if (!is_array($value)) {
            $value = trim($value);
            if (mb_strlen($value) < 1) {
                $value = $def;
            }
        }
    }

    return $value;
}


function get_page_info($total_count, $now_page, $list_count, $group_count)
{
    if (!$now_page) {
        $now_page = 1;
    }

    if (!$list_count) {
        $list_count = 15;
    }

    if (!$group_count) {
        $group_count = 5;
    }

    $total_page = intval((($total_count - 1) / $list_count)) + 1;
    $total_group = intval((($total_page) - 1) / ($group_count)) + 1;
    $now_group = intval((($now_page - 1) / $group_count)) + 1;
    $group_start = intval((($now_group - 1) * $group_count)) + 1;
    $group_end = min($total_page, $now_group * $group_count);

    $prev_group_last_page = 0;
    if ($group_start > $group_count) {
        $prev_group_last_page = $group_start - 1;
    }

    $next_group_first_page = 0;
    if ($group_end < $total_page) {
        $next_group_first_page = $group_end + 1;
    }

    $offset = ($now_page - 1) * $list_count;

    $data = array('now_page' => $now_page,
        'total_count' => $total_count,
        'list_count' => $list_count,
        'total_page' => $total_page,
        'group_count' => $group_count,
        'total_group' => $total_group,
        'now_group' => $now_group,
        'group_start' => $group_start,
        'group_end' => $group_end,
        'prev_group_last_page' => $prev_group_last_page,
        'next_group_first_page' => $next_group_first_page,
        'offset' => $offset,);

    return $data;
}

function array_urlencode($data)
{
    if (is_array($data)) {
        $new_data = array();
        foreach ($data AS $k => $v) {
            if (is_array($v)) {
                $new_data[$k] = array_urlencode($v);
            } else {
                $new_data[$k] = urlencode($v);
            }
        }
    } else {
        $new_data = urlencode($data);
    }

    return $new_data;
}

function print_rest_api($rt, $data)
{
    $buffer['rt'] = $rt;
    $buffer['pubdate'] = date('Y-m-d H:i:s', time());

    if ($data) {
        $buffer = array_merge($buffer, $data);
    }

    $enc_data = array_urlencode($buffer);
    $json = urldecode(json_encode($enc_data));


    echo($json);
    exit();
}
